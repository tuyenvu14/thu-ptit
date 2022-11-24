import { useEffect } from 'react'
import { Spin } from 'antd'
import { Post } from 'Models'
import { useHistory, useParams } from 'react-router'
import { ModeForm } from '../../constants/enum'
import { useNotification } from '../../hook/useNotification'
import { useGetPostQuery, useUpdatePostMutation } from './api'
import PostForm from './PostForm'
import { MESSAGE_UPDATED_SUCCESS } from '../../constants'

const PostEdit = () => {
  //@ts-ignore
  const { id } = useParams()
  const history = useHistory()

  const { data, isLoading, isError } = useGetPostQuery(id)

  const [
    updatePost,
    { isLoading: isUpdating, isError: isUpdateError, isSuccess }
  ] = useUpdatePostMutation()

  const handleSubmitForm = (data: Post) => {
    updatePost({ ...data, id })
  }

  useEffect(() => {
    if (isSuccess) {
      history.goBack()
    }
  }, [isSuccess])

  useNotification(isError)
  useNotification(isSuccess, isUpdateError, MESSAGE_UPDATED_SUCCESS)

  return (
    <Spin spinning={isLoading || isUpdating}>
      {data ? (
        <PostForm
          title="Sửa bài viết"
          handleSubmitForm={handleSubmitForm}
          data={data}
          modeForm={ModeForm.Update}
        />
      ) : null}
    </Spin>
  )
}

export default PostEdit
