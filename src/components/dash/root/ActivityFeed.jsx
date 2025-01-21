import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, ThumbsDown } from 'lucide-react'
import { generateFakeActivities } from '@/utils/Faker'

const activities = generateFakeActivities(10);

const ActivityFeed = () => {
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
                  <span className="font-medium text-gray-900">{activity.user}</span> {activity.message}
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
  );
};

export default ActivityFeed;