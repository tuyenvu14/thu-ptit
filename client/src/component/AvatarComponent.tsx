import { BookOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout, selectUserLoggedIn } from '../features/login/authSlice'

const AvatarComponent = () => {
  const userCurrent = useSelector(selectUserLoggedIn)
  const dispatch = useDispatch()

  const handleSelectOption = (e: MenuInfo) => {
    if (e.key === '1') {
      dispatch(logout())
    }
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <>
              <UserOutlined className="mr-2" /> {userCurrent?.username}
            </>
          ),
          key: '0'
        },
        {
          label: (
            <>
              <LogoutOutlined className="mr-2" /> Đăng xuất
            </>
          ),
          key: '1'
        },
        {
          label: (
            <>
              <BookOutlined className="mr-2" /> Tài liệu tham khảo
            </>
          ),
          key: '2'
        }
      ]}
      onClick={(e) => handleSelectOption(e)}
    />
  )

  return (
    // <Avatar shape="circle" size="default" icon={<UserOutlined />}>
    //   U
    // </Avatar>
    // <Avatar shape="circle" size="default">
    //   T
    // </Avatar>
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={(e) => console.log(1)}>
        <Avatar shape="circle" size="default">
          {userCurrent?.username[0]}
        </Avatar>
      </a>
    </Dropdown>
  )
}

export default AvatarComponent
