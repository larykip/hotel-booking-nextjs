import Image from "next/image"
import Link from "next/link"

import { Card,CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import JoinForm from "@/components/authForms/JoinForm"
import { Separator } from "@/components/ui/separator"


const JoinPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Join</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>

            <Separator />
            
            {/* Form begins here */}
            <CardContent>
              <JoinForm/>
            </CardContent>
        </Card>
      </div>


      <div className="hidden bg-muted lg:block">
        <Image
          src="https://via.placeholder.com/1080"
          alt="Background image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default JoinPage