import React from 'react'

export const Users = () => {
  return (
<div>
        <h1>add users to projects</h1>
        <input
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                />

    </div>
  )
}
