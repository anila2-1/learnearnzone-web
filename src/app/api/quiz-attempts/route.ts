// src/app/api/quiz-attempts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { quizId, answers, blogId } = await req.json()
    const memberId = (await cookies()).get('member_id')?.value

    if (!memberId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!quizId || typeof quizId !== 'string') {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }
    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Get the quiz with points and questions
    const quiz = await payload.findByID({
      collection: 'quizzes',
      id: quizId,
      overrideAccess: true,
      depth: 2,
    })

    if (!quiz || !quiz.questions) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    if (answers.length !== quiz.questions.length) {
      return NextResponse.json({ error: 'All questions must be answered' }, { status: 400 })
    }

    // Get current member with their completion history
    const member = await payload.findByID({
      collection: 'members',
      id: memberId,
      depth: 2,
    })

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    // Check if quiz already completed to prevent duplicate points
    const existingAttempt = (member.completedQuizIds || []).find(
      (attempt: any) => attempt.quizId === quizId
    )

    if (existingAttempt) {
      return NextResponse.json(
        {
          error: 'Quiz already completed',
          result: {
            score: existingAttempt.score,
            total: quiz.questions.length,
            pointsEarned: 0, // No new points for duplicate attempts
          },
        },
        { status: 409 }
      )
    }

    // Calculate points and update member
    const pointsEarned = quiz.points || 10 // Default to 10 points if not specified
    const totalQuestions = quiz.questions.length

    // Prepare the update data with proper completion tracking
    const updateData = {
      // Add points to wallet
      wallet: (member.wallet || 0) + pointsEarned,

      // Track completed blog if not already completed
      completedBlogs: member.completedBlogs?.some((item: any) => item.blog?.id === blogId)
        ? member.completedBlogs
        : [
            ...(member.completedBlogs || []),
            {
              blog: blogId,
              score: pointsEarned,
              completedAt: new Date().toISOString(),
            },
          ],

      // Add completed quiz record
      completedQuizIds: [
        ...(member.completedQuizIds || []).filter((item: any) => item.quizId !== quizId),
        {
          quizId,
          score: pointsEarned,
          completedAt: new Date().toISOString(),
        },
      ],
    }

    const updatedMember = await payload.update({
      collection: 'members',
      id: memberId,
      data: updateData,
    })

    // Log the completion for monitoring
    console.log(`Quiz ${quizId} completed by member ${memberId} - Points earned: ${pointsEarned}`)

    return NextResponse.json({
      result: {
        score: totalQuestions,
        total: totalQuestions,
        pointsEarned,
        member: updatedMember,
      },
    })
  } catch (error: any) {
    console.error('Quiz attempt error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
