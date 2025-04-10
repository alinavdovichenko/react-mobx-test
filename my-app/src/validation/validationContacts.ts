import Joi from 'joi';

export const contactSchema = Joi.object({
    firstname: Joi.string()
        .required()
        .min(1)
        .max(100)
        .label('Firstname')
        .messages({
            'any.required': `"Firstname" is required`,
            'string.min': `"Firstname" should have at least {#limit} characters`,
            'string.max': `"Firstname" should have at most {#limit} characters`,
        }),
    lastname: Joi.string()
        .required()
        .min(1)
        .max(100)
        .label('Lastname')
        .messages({
            'any.required': `"Lastname" is required`,
            'string.min': `"Lastname" should have at least {#limit} characters`,
            'string.max': `"Lastname" should have at most {#limit} characters`,
        }),
    phone: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .label('Phone')
        .min(10)
        .max(15)
        .messages({
            'any.required': `"Phone" is required`,
            'string.pattern.base': `"Phone" must contain only digits`,
            'string.min': `"Phone" should have at least {#limit} characters`,
            'string.max': `"Phone" should have at most {#limit} characters`,
        }),
    email: Joi.string()
        .email()
        .required()
        .label('Email')
        .messages({
            'any.required': `"Email" is required`,
            'string.email': `"Email" must be a valid email`,
        }),
});
