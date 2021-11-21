import React from "react"

const UsersBarItem = ({user}) => {
    return (
        <div
            style={{
                opacity: user.disabled ? '0.5' : '1'
            }}
        >
        <div className="users-bar__user user-info-item">
            <div className="user-info-item__avatar-container">
                <img src={user.avatar} />
            </div>
            <div className="user-info-item__nickname-container">
                <span className="user-info-item__nickanme">{user.nickname}</span>
            </div>
        </div>
        </div>
    )
}

export default UsersBarItem
