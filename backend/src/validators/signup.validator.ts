export const signupValidator = {
  profileAtHandle: {
    escape: true,
    trim: true,
    isLength: {
      errorMessage: 'profileAtHandle must be between seven and thirty two characters',
      options: { min: 7, max: 32 }
    }
  },
  profileAvatarUrl: {
    optional: {
      nullable: true
    },
    trim: true,
    escape: true
  },
  profileEmail: {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
    // normalizeEmail: true,
    trim: true
  },
  profilePassword: {
    isLength: {
      errorMessage: 'Password must be at least eight characters',
      options: { min: 8 }
    },
    trim: true,
    escape: true
  },
  profilePasswordConfirm: {
    isLength: {
      errorMessage: 'confirm password must be at least eight characters',
      options: { min: 8 }
    },
    trim: true,
    escape: true
  },
  profilePhone: {
    escape: true,
    trim: true,
    optional: {
      options: {
        nullable: true
      }
    }
  }
};
