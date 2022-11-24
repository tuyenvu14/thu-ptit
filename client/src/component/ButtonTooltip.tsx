import React from 'react'
import { Tooltip, Button } from 'antd'

type Props = {
  title: string
  buttonIcon: JSX.Element
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  className?: string
  disabled?: boolean
}

const ButtonTooltip: React.FC<Props> = (props: Props) => {
  return (
    <Tooltip placement="top" title={props.title}>
      <Button
        type="text"
        className={props.className || 'text-blue-500'}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.buttonIcon}
      </Button>
    </Tooltip>
  )
}

export default ButtonTooltip
