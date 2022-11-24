import { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'

export const useNotification = (
  isSuccess?: boolean,
  isError?: boolean,
  content?: string
) => {
  const { addToast } = useToasts()
  useEffect(() => {
    if (isSuccess) {
      addToast(content, {
        appearance: 'success',
        autoDismiss: true
      })
    }
    if (isError) {
      addToast('Lỗi', {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }, [isSuccess, isError])
}
