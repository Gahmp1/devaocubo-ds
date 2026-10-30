import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { FeedbackPage } from './FeedbackPage'

const meta: Meta = { title: 'Fundação/Feedback' }
export default meta

/** Vibração e som por papel; o log mostra o que `resolveFeedback` decidiu. Som começa desligado. */
export const Feedback: StoryObj = { render: () => <FeedbackPage /> }
