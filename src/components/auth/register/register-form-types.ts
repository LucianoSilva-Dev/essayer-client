type CardType = "student" | "teacher"

export type RegisterFormData = {
    userType: CardType,
    firstName: string,
    lastName: string,
    email: string,
    lattes: string,
    password: string,
    confirmPassword: string,
    registerRequestId: string,
}

