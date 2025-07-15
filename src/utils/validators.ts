export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

/**
 * Validate name field
 */
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }
  
  return { isValid: true };
};

/**
 * Validate message field
 */
export const validateMessage = (message: string): ValidationResult => {
  if (!message.trim()) {
    return { isValid: false, message: 'Message is required' };
  }
  
  if (message.trim().length < 10) {
    return { isValid: false, message: 'Message must be at least 10 characters long' };
  }
  
  if (message.trim().length > 1000) {
    return { isValid: false, message: 'Message must be less than 1000 characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate subject field
 */
export const validateSubject = (subject: string): ValidationResult => {
  if (!subject.trim()) {
    return { isValid: false, message: 'Subject is required' };
  }
  
  if (subject.trim().length < 3) {
    return { isValid: false, message: 'Subject must be at least 3 characters long' };
  }
  
  return { isValid: true };
};

/**
 * Validate contact form
 */
export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message!;
  }
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message!;
  }
  
  const subjectValidation = validateSubject(formData.subject);
  if (!subjectValidation.isValid) {
    errors.subject = subjectValidation.message!;
  }
  
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.message!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};