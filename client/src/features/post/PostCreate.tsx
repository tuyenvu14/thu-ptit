import { Spin } from 'antd'
import { Post } from 'Models'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { MESSAGE_CREATED_SUCCESS } from '../../constants'
import { ModeForm } from '../../constants/enum'
import { useNotification } from '../../hook/useNotification'
import { useCreatePostMutation } from './api'
import PostForm from './PostForm'

const PostCreate = () => {
  const history = useHistory()

  const [createPost, { isLoading, isError, isSuccess }] =
    useCreatePostMutation()

  const handleSubmitForm = (data: Post) => {
    // console.log(data, '--------------dataInput')
    createPost(data)
  }

  useEffect(() => {
    if (isSuccess) {
      history.goBack()
    }
  }, [isSuccess])

  useNotification(isSuccess, isError, MESSAGE_CREATED_SUCCESS)

  return (
    <Spin spinning={isLoading}>
      <PostForm
        title={'Tạo bài viết'}
        handleSubmitForm={handleSubmitForm}
        modeForm={ModeForm.Create}
      />
    </Spin>
  )
}

export default PostCreate
