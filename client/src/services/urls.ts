function generateRoutes<T extends Record<string, string>>(
  baseUrl: string,
  routes: T
): Record<keyof T, string> {
  const generatedRoutes = {} as Record<keyof T, string>

  for (const key in routes) {
    generatedRoutes[key] = `${baseUrl}${routes[key]}`
  }

  return generatedRoutes
}

const urls = {
  public: {
    authentication: {
      routes: generateRoutes('/api/auth', {
        login: '/login',
        register: '/register',
        logout: '/logout',
      }),
    },
    verifyToken: {
      routes: generateRoutes('/api/v/token', {
        user: '/verify-user',
      }),
    },
    quiz: {
      routes: generateRoutes('/api/quiz', {
        quizzes: '/quizzes',
        quiz: "/quiz",
        checkAnswers: '/quiz/check-answers',
      }),
    },
  },
  private: {
    quiz: {
      routes: generateRoutes('/api/user/quiz', {
        creating: '/creating',
        getCreatedByCreator: '/get-created-by-creator',
      }),
    },
  },
}

export default urls
