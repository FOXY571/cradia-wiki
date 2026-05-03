import { serverTimestamp } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { documentExists, getDocument, setDocument } from '../firebase/databaseHandler'

class AuthError extends Error {
  constructor(code, message, cause) {
    super(message || code)
    this.name = 'AuthError'
    this.code = code
    this.cause = cause
  }
}

function getNormalizedUsername(username) {
  return username.trim().toLowerCase().normalize('NFKC')
}

async function setUserDocs(uid, username, email) {
  const normalizedUsername = getNormalizedUsername(username)

  await setDocument('users', uid, {
    username: username,
    normalizedUsername: normalizedUsername,
    email: email.value,
    registeredAt: serverTimestamp(),
  })
  await setDocument('usernames', normalizedUsername, { uid })
}

/**
 * Attempts to create a new user account with the provided username, email, and password.
 *
 * @param {string} username The desired username for the new account.
 * @param {string} email The email address for the new account.
 * @param {string} password The password for the new account.
 * @throws {AuthError} Throws an AuthError if the username is already in use, the email is already in use, or if an unknown error occurs during account creation.
 */
export async function createUserAccount(username, email, password) {
  const normalizedUsername = getNormalizedUsername(username)

  if (await documentExists('usernames', normalizedUsername)) {
    throw new AuthError(
      'USERNAME_ALREADY_EXISTS',
      'Username entered already in use. Please choose a different username.',
    )
  }

  const auth = getAuth()

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const uid = userCredential.user.uid

    await setUserDocs(uid, username, email)
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new AuthError(
          'EMAIL_ALREADY_IN_USE',
          'Email address entered already in use. Please use a different email address.',
          error,
        )
      default:
        throw new AuthError('UNKNOWN_ERROR', 'An error occurred. Please try again.', error)
    }
  }
}

/**
 * Attempts to log in a user with the provided username and password.
 *
 * @param {string} username The username of the user attempting to log in.
 * @param {string} password The password of the user attempting to log in.
 * @throws {AuthError} Throws an AuthError if the username or password is incorrect, or if an unknown error occurs during login.
 */
export async function logInUser(username, password) {
  const normalizedUsername = getNormalizedUsername(username)
  const usernameDoc = await getDocument('usernames', normalizedUsername)
  const userDoc = usernameDoc ? await getDocument('users', usernameDoc.uid) : null

  if (!usernameDoc || !userDoc || username !== userDoc.username) {
    throw new AuthError(
      'WRONG_CREDENTIALS',
      'The username or password you entered is incorrect. Please check your credentials and try again.',
    )
  }

  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, userDoc.email, password)
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        throw new AuthError(
          'WRONG_CREDENTIALS',
          'The username or password you entered is incorrect. Please check your credentials and try again.',
          error,
        )
      default:
        throw new AuthError('UNKNOWN_ERROR', 'An error occurred. Please try again.', error)
    }
  }
}
