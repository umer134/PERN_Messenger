import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../input/Input'
import { cn } from '../../../shared/lib/cn'

export const PasswordInput = (props: any) => {
  const [show, setShow] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <Input
        {...props}
        type={show ? 'text' : 'password'}
      />

      <button
        type="button"
        onClick={() => setShow(v => !v)}
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#aaa',
        }}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}