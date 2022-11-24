import { Spin } from 'antd'
import { Post } from 'Models'
import { useParams } from 'react-router'
import { ModeForm } from '../../constants/enum'
import { useNotification } from '../../hook/useNotification'
import { useGetPostQuery } from './api'
import PostForm from './PostForm'

const PostDetail = () => {
  //@ts-ignore
  const { id } = useParams()

  const { data, isLoading, isError } = useGetPostQuery(id, {
    // refetchOnMountOrArgChange: true
  })

  const handleSubmitForm = (data: Post) => {}

  useNotification(isError)

  return (
    <Spin spinning={isLoading}>
      {data ? (
        <PostForm
          title="Xem bài viết"
          handleSubmitForm={handleSubmitForm}
          data={data}
          modeForm={ModeForm.View}
        />
      ) : null}
    </Spin>
  )
}

export default PostDetail
