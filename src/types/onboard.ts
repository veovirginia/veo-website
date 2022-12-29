export interface OnboardContextInterface {
   step: number
   formValues: OnboardContextForm
   updateStep: (page: number) => void
   updateInfo: (newInfo: OnboardContextInfo) => void
   updateMeeting: (newMeeting: OnboardContextMeeting) => void
}

export interface OnboardContextForm {
   info: OnboardContextInfo
   meeting: OnboardContextMeeting
}

export interface OnboardContextInfo {
   phone: string
   graduation: string
   major: string
   idea: string
}

export interface OnboardContextMeeting {
   member: [string, number]
   isScheduled: boolean
}
