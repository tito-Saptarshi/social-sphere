/**
 * v0 by Vercel.
 * @see https://v0.dev/t/E2ue6KcSurJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Card className="p-4 md:p-6">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link href="#" className="flex items-center gap-4 rounded-md p-3 hover:bg-muted" prefetch={false}>
                  <img
                    src="/placeholder.svg"
                    alt="Post Image"
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium">The Joke Tax Chronicles</h4>
                    <p className="text-sm text-muted-foreground">
                      Once upon a time, in a far-off land, there was a very lazy king...
                    </p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center gap-4 rounded-md p-3 hover:bg-muted" prefetch={false}>
                  <img
                    src="/placeholder.svg"
                    alt="Post Image"
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium">The Rise of Jokester</h4>
                    <p className="text-sm text-muted-foreground">
                      Jokester began sneaking into the castle in the middle of the night...
                    </p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center gap-4 rounded-md p-3 hover:bg-muted" prefetch={false}>
                  <img
                    src="/placeholder.svg"
                    alt="Post Image"
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium">The Laughter Epidemic</h4>
                    <p className="text-sm text-muted-foreground">
                      And then, one day, the people of the kingdom discovered that the jokes...
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="hidden md:block">
          <Card className="p-4 md:p-6">
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src="/placeholder.svg"
                  alt="Post Image"
                  width={600}
                  height={400}
                  className="aspect-[3/2] rounded-md object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold">The Joke Tax Chronicles</h3>
                  <p className="mt-2 text-muted-foreground">
                    Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                    throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in
                    the kingdom. Jokester began sneaking into the castle in the middle of the night and leaving jokes
                    all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so
                    funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="md:hidden">
        <Card className="p-4 md:p-6">
          <CardHeader>
            <CardTitle>The Joke Tax Chronicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src="/placeholder.svg"
                alt="Post Image"
                width={600}
                height={400}
                className="aspect-[3/2] rounded-md object-cover"
              />
              <div>
                <p className="text-muted-foreground">
                  Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                  throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in
                  the kingdom. Jokester began sneaking into the castle in the middle of the night and leaving jokes all
                  over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious,
                  but he couldn't seem to stop Jokester.
                </p>
                <p className="mt-4 text-muted-foreground">
                  And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny
                  that they couldn't help but laugh. And once they started laughing, they couldn't stop.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Toggle Description
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}