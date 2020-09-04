import React,{forwardRef} from 'react'
import { CardContent, Typography, Card } from '@material-ui/core'
import './Message.css'

const Message = forwardRef(({message,usernameActual}, ref)=> {
    const isUser = usernameActual === message.username

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard":"message__guestCard"}>
                <CardContent>
                    <Typography className={'message__text'} color='white' variant="h5" component="h2">
                    {!isUser && `${message.username || "Unknown User"}:`} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
