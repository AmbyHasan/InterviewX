"use client"
import { Badge } from '@/src/components/ui/badge'; 
import {Card,CardContent, CardDescription, CardHeader, CardTitle,} from "@/src/components/ui/card";
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';

export default function WeakConcepts({ assessments }: any) {

  const topicCount: any = {}
  const router=useRouter();

  assessments.forEach((a: any) => {
    a.weakTopics.forEach((topic: string) => {

      topicCount[topic] = (topicCount[topic] || 0) + 1

    })
  })

  const weakTopics = Object.entries(topicCount)
    .sort((a: any, b: any) => b[1] - a[1])

  return (

   


<Card
  className="bg-black
  border border-blue-500/30
  shadow-[0_0_10px_rgba(0,140,255,0.35)]
  rounded-xl h-full"
>
  <CardHeader>
    <CardTitle className="text-yellow-300 text-2xl">
      Weak Concepts
    </CardTitle>

    <CardDescription>
      Set of topics you need to work on
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">

    {weakTopics.length > 0 ? (
      <>
      <div className="flex flex-wrap gap-2">

        {weakTopics.map(([topic, count]: any) => (
          <Badge
            key={topic}
            variant="outline"
            className="p-1 font-bold bg-muted/50"
          >
            {topic} <span className="text-yellow-300">{count}</span>
          </Badge>
        ))}
</div>
    <div className="text-sm text-slate-300">
        Want to get a perfect roadmap to master these concepts??
    </div>
   </>
      
    ) : (
      <div>
      <p className="text-sm text-slate-300">
        No weak concepts yet. Keep going, and your improvement areas will appear as you complete assessments.
      </p>
      
 <div className="text-sm text-slate-300">
        Want to get a perfect roadmap to master your weak concepts??
    </div>
      </div>
    )}

  

    <Button className="w-full sm:w-auto cursor-pointer" onClick={()=>router.push("/tools/ai-roadmap-generator")}>Roadmap Generator</Button>

  </CardContent>
</Card>
  )
}