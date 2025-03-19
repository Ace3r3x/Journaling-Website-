import React, { useState, useEffect } from 'react'
import { Moon, Sun, User, Settings, Calendar, List, Droplet, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const moodData = [
  { date: '04/14', mood: 4 },
  { date: '04/15', mood: 3 },
  { date: '04/16', mood: 4 },
  { date: '04/17', mood: 2 },
  { date: '04/18', mood: 3 },
  { date: '04/19', mood: 4 },
  { date: '04/20', mood: 3 },
]

const todoItems = {
  todo: ['Grocery shopping', 'Exercise', 'Phone call'],
  inProgress: ['Update report', 'Team meeting'],
  done: ['Feed the cat', 'Send invoice']
}

export default function Component() {
  const [activeView, setActiveView] = useState('journal')
  const [activeTracker, setActiveTracker] = useState('water')
  const [waterProgress, setWaterProgress] = useState(57.5)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const NavButton = ({ icon: Icon, label, view }) => (
    <Button
      variant={activeView === view ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={() => setActiveView(view)}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )

  const TrackerToggle = ({ label, tracker }) => (
    <TabsTrigger value={tracker}>{label}</TabsTrigger>
  )

  const TodoList = ({ status, items }) => (
    <Card>
      <CardHeader>
        <CardTitle>{status}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <div className={`flex h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <aside className="w-64 bg-card p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-6 w-6" />
          <span className="font-semibold">John Doe</span>
        </div>
        <nav className="space-y-2 flex-grow">
          <NavButton icon={BookOpen} label="Journal" view="journal" />
          <NavButton icon={Droplet} label="Tracker" view="tracker" />
          <NavButton icon={Calendar} label="Calendar" view="calendar" />
          <NavButton icon={List} label="To-do List" view="todo" />
        </nav>
        <NavButton icon={Settings} label="Settings" view="settings" />
        <div className="mt-4 text-center text-sm text-muted-foreground">your-journal.com</div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Good Morning</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Tabs value={activeTracker} onValueChange={setActiveTracker}>
              <TabsList>
                <TrackerToggle label="Water" tracker="water" />
                <TrackerToggle label="Mood" tracker="mood" />
              </TabsList>
            </Tabs>
          </div>
        </header>
        {activeView === 'tracker' && (
          <Tabs value={activeTracker}>
            <TabsContent value="water">
              <Card>
                <CardHeader>
                  <CardTitle>2.3 Litres Drank Today!</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={waterProgress} className="mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Yesterday you completed 85% of your goal</p>
                  <p className="text-sm text-muted-foreground mb-2">On Wednesday you completed 100% of your goal</p>
                  <p className="text-sm text-muted-foreground mb-4">On Tuesday you completed 75% of your goal</p>
                  <div className="flex justify-between items-center">
                    <span>4 Litres Daily Goal</span>
                    <Button>Edit Water Goal</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mood">
              <Card>
                <CardHeader>
                  <CardTitle>How are you feeling today?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <Button variant="outline">😊 Amazing</Button>
                    <Button variant="outline">🙂 Fine</Button>
                    <Button variant="outline">😐 Meh</Button>
                    <Button variant="outline">😔 Sad</Button>
                  </div>
                  <ChartContainer
                    config={{
                      mood: {
                        label: "Mood",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
        {activeView === 'todo' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TodoList status="To Do" items={todoItems.todo} />
            <TodoList status="In Progress" items={todoItems.inProgress} />
            <TodoList status="Done" items={todoItems.done} />
          </div>
        )}
        {activeView === 'calendar' && (
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Calendar functionality to be implemented</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}