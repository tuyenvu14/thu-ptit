import { Button, Card, List, Modal, Spin } from 'antd'
import { useHistory } from 'react-router'
import { MESSAGE_DELETED_SUCCESS } from '../../constants'
import { useNotification } from '../../hook/useNotification'
import { useDeletePostMutation, useGetPostsQuery } from './api'

const PostList = () => {
  const { data, isLoading, isError } = useGetPostsQuery(undefined, {
    // skip: true: skip api
    // refetchOnReconnect: true,
    // refetchOnFocus: true - browser focus again -> refetch api
    // refetchOnMountOrArgChange: true
    // pollingInterval: 5000 - set time refetch api
    // refetchOnReconnect: true: network connect again ->> refetch api
  })

  const [
    deletePost,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess
    }
  ] = useDeletePostMutation()
  const history = useHistory()

  const handleDeletePost = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắn chắn muốn xóa bài viết đã chọn?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => deletePost(id)
    })
  }

  useNotification(isError)
  useNotification(isDeleteSuccess, isDeleteError, MESSAGE_DELETED_SUCCESS)

  return (
    <>
      <Spin spinning={isLoading}>
        {data ? (
          <Card
            title="Danh sách bài viết"
            extra={
              <Button
                type="primary"
                onClick={() => history.push('/post/create')}
              >
                Thêm mới
              </Button>
            }
          >
            <List
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data.posts}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <div>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => history.push(`/post/detail/${item.id}`)}
                      >
                        Xem
                      </Button>
                      <Button
                        className="mx-5"
                        onClick={() => history.push(`/post/edit/${item.id}`)}
                      >
                        Sửa
                      </Button>
                      <Button danger onClick={() => handleDeletePost(item.id)}>
                        Xóa
                      </Button>
                    </div>
                  }
                >
                  {item.content}
                </List.Item>
              )}
            />
          </Card>
        ) : null}
      </Spin>
    </>
  )
}

export default PostList
