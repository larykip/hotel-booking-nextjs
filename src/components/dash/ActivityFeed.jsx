import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MessageCircle, ThumbsDown } from 'lucide-react'

const activities = [
    {
      user: 'Faruk ahmad',
      room: 'Room #1420',
      date: '20/01/21 - 28/01/21',
      time: '1 min',
      avatar: 'https://gravatar.com/avatar/3a16a24e3049c2f56749b3f750f7707f?s=400&d=robohash&r=x',
    },
    {
      user: 'Yasin arafat',
      room: 'Room #1430',
      date: '20/01/21 - 28/01/21',
      time: '9 min',
      avatar: 'https://gravatar.com/avatar/88f8a2ced75157598ca37e2c7ed4caee?s=400&d=robohash&r=x',
    },
    {
      user: 'Rakib hassan',
      room: 'Room #1422',
      date: '20/01/21 - 28/01/21',
      time: '21 min',
      avatar: 'https://gravatar.com/avatar/e688d85a5fd5c211bcf6211c8d055d60?s=400&d=robohash&r=x',
    },
  ]

const ActivityFeed = ({ activities }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Recent activities</CardTitle>
        <Button variant="link" className="text-sm text-blue-600">View all</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.room}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{activity.user}</span>{" "}
                  {activity.message}
                </p>
                {activity.actions && (
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Show empathy
                    </Button>
                    <Button variant="outline" size="sm" className="h-7">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityFeed