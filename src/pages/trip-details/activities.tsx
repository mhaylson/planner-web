import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'

interface Activity {
  date: string
  activities: {
    id: string
    title: string | null
    occurs_at: string
  }[]
}

export function Activities() {

  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {

    api.get(`/trips/${tripId}/activities`)
      .then(response => setActivities(response.data.activities))
  }, [tripId])


  return (
    <div className="space-y-8">
      {
        activities.map(activity => {
          return (
            <div key={activity.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, 'd')}</span>
                <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
              </div>
              {
                activity.activities.length > 0 ? (
                  <div>
                    {
                      activity.activities.map(item => {
                        return (
                          <div key={item.id} className="px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl flex items-center gap-3">
                            <CircleCheck className="text-lime-300 size-5" />
                            <span className="text-zinc-100 flex-1">{item.title}</span>
                            <span className="text-zinc-400 ml-auto">{`${format(item.occurs_at, 'HH:mm')}h`}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}