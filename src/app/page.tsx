'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { Bell, Menu, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Roboto } from "next/font/google";
import Image from 'next/image';

interface Task {
  id: number;
  title: string;
  priority: 'urgent' | 'important' | 'normal' | 'low';
  completed: boolean;
  date: string;
}
const roboto = Roboto({
 subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const TimeManagementPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete Project Proposal', priority: 'urgent', completed: false, date: '2025-05-15' },
    { id: 2, title: 'Team Meeting', priority: 'important', completed: true, date: '2025-05-15' },
    { id: 3, title: 'Review Code', priority: 'normal', completed: false, date: '2025-05-15' },
  ]);
  
  // State for task management
  const [selectedPriority, setSelectedPriority] = useState<'urgent' | 'important' | 'normal' | 'low' | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const weeklyData = [
    { name: 'Mon', tasks: 4, completed: 3 },
    { name: 'Tue', tasks: 6, completed: 4 },
    { name: 'Wed', tasks: 5, completed: 5 },
    { name: 'Thu', tasks: 8, completed: 6 },
    { name: 'Fri', tasks: 7, completed: 4 },
    { name: 'Sat', tasks: 3, completed: 2 },
    { name: 'Sun', tasks: 2, completed: 2 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const priorityColors = {
    urgent: '#D62828',
    important: '#F77F00',
    normal: '#FCBF49',
    low: '#EAE2B7',
  };
  
  const priorityLabels = {
    urgent: 'Urgent & Important',
    important: 'Important',
    normal: 'Normal',
    low: 'Low Priority',
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Task management functions
  const handleAddTask = () => {
    if (newTaskTitle.trim() && selectedPriority) {
      const newTask: Task = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: newTaskTitle.trim(),
        priority: selectedPriority,
        completed: false,
        date: new Date().toISOString().split('T')[0]
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };
  
  const handleUpdateTask = () => {
    if (newTaskTitle.trim() && editingTaskId) {
      setTasks(tasks.map(task => 
        task.id === editingTaskId ? { ...task, title: newTaskTitle.trim() } : task
      ));
      setEditingTaskId(null);
      setNewTaskTitle('');
      setIsEditingTask(false);
    }
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const openTaskEditor = (priority: 'urgent' | 'important' | 'normal' | 'low') => {
    setSelectedPriority(priority);
    setIsAddingTask(true);
    setEditingTaskId(null);
    setNewTaskTitle('');
  };
  
  const openTaskEditModal = (task: Task) => {
    setEditingTaskId(task.id);
    setSelectedPriority(task.priority);
    setNewTaskTitle(task.title);
    setIsEditingTask(true);
  };
  const handleToggleComplete = (taskId: number) => {
  setTasks(tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
};

  

  return (
    <div className={`${roboto.className} min-h-screen bg-[#003049] text-white p-4`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
  <div className="flex items-center space-x-4">
   <Image 
  src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=64&auto=format&fit=crop&ixlib=rb-4.1.0" 
  alt="User profile picture"
  width={48} 
  height={48}
  priority={true}
  className="rounded-full object-cover aspect-square"
/>

    <div className="text-white">
      <p className="text-sm opacity-70">Good morning,</p>
      <p className="font-semibold text-lg">Alisia</p>
    </div>
  </div>


  <div className="flex items-center space-x-4">
    <Bell className="w-6 h-6 text-white" />
    <Menu className="w-6 h-6 text-white" />
    
  </div>
</header>

      {/* Time and Date */}
      <div className="mb-8 flex flex-row justify-around items-center">
         <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Date</span>
<p className="text-2xl font-bold">{formatDate(currentTime)}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Time</span>
<h1 className="text-2xl font-bold">
  {currentTime.toLocaleTimeString()}
</h1>
        </div>
      </div>

      {/* Eisenhower Matrix */}
    {/* Eisenhower Matrix */}
      <div id="Eisenhower-Matrix" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Task Priority Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Urgent & Important */}
          <div className="p-3 rounded-lg bg-[#D62828]/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm sm:text-base">Urgent & Important</h3>
              <button 
                onClick={() => openTaskEditor('urgent')}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
            {tasks.filter(t => t.priority === 'urgent').map(task => (
              <div key={task.id} className="mt-2 p-2 rounded bg-[#D62828]/30 flex justify-between items-center text-sm sm:text-base">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task.id)} 
                  className="mr-2"
                />
                <span className={`flex-1 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </span>
                <div className="flex space-x-1">
                  <button onClick={() => openTaskEditModal(task)} className="p-1 text-white hover:text-blue-300">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-white hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Important */}
          <div className="p-3 rounded-lg bg-[#F77F00]/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm sm:text-base">Important</h3>
              <button 
                onClick={() => openTaskEditor('important')}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
            {tasks.filter(t => t.priority === 'important').map(task => (
              <div 
                key={task.id} 
                className="mt-2 p-2 rounded bg-[#F77F00]/30 flex justify-between items-center text-sm sm:text-base"
              >
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task.id)} 
                  className="mr-2"
                />
                <span className={`flex-1 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </span>
                <div className="flex space-x-1">
                  <button onClick={() => openTaskEditModal(task)} className="p-1 text-white hover:text-blue-300">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-white hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Normal */}
          <div className="p-3 rounded-lg bg-[#FCBF49]/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm sm:text-base">Normal</h3>
              <button 
                onClick={() => openTaskEditor('normal')}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
            {tasks.filter(t => t.priority === 'normal').map(task => (
              <div 
                key={task.id} 
                className="mt-2 p-2 rounded bg-[#FCBF49]/30 flex justify-between items-center text-sm sm:text-base"
              >
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task.id)} 
                  className="mr-2"
                />
                <span className={`flex-1 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </span>
                <div className="flex space-x-1">
                  <button onClick={() => openTaskEditModal(task)} className="p-1 text-white hover:text-blue-300">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-white hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Low Priority */}
          <div className="p-3 rounded-lg bg-[#EAE2B7]/20 text-black">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm sm:text-base">Low Priority</h3>
              <button 
                onClick={() => openTaskEditor('low')}
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {tasks.filter(t => t.priority === 'low').map(task => (
              <div 
                key={task.id} 
                className="mt-2 p-2 rounded bg-[#EAE2B7]/40 flex justify-between items-center text-sm sm:text-base"
              >
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleComplete(task.id)} 
                  className="mr-2"
                />
                <span className={`flex-1 truncate ${task.completed ? 'line-through text-gray-600' : ''}`}>
                  {task.title}
                </span>
                <div className="flex space-x-1">
                  <button onClick={() => openTaskEditModal(task)} className="p-1 hover:text-blue-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="p-1 hover:text-red-700">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    
      
      {/* Task Add Modal */}
      {isAddingTask && selectedPriority && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div 
            className="p-4 rounded-lg w-full max-w-md" 
            style={{ backgroundColor: `#003049` }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Add Task to {priorityLabels[selectedPriority]}
              </h3>
              <button 
                onClick={() => setIsAddingTask(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask}
                className="px-4 py-2 rounded" 
                style={{ backgroundColor: priorityColors[selectedPriority] }}
                disabled={!newTaskTitle.trim()}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Edit Modal */}
      {isEditingTask && editingTaskId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div 
            className="p-4 rounded-lg w-full max-w-md" 
            style={{ backgroundColor: `#003049` }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Update Task in {selectedPriority ? priorityLabels[selectedPriority] : 'Task'}
              </h3>
              <button 
                onClick={() => setIsEditingTask(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsEditingTask(false)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateTask}
                className="px-4 py-2 rounded" 
                style={{ backgroundColor: priorityColors[selectedPriority] }}
                disabled={!newTaskTitle.trim()}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      {/* Weekly Progress */}
      <div id="weekly-progress" className="mb-8 p-4 rounded-xl backdrop-blur-md bg-white/10">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#003049',
                  border: '1px solid #ffffff20'
                }}
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#FCBF49"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#F77F00"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task List */}
      <div id="Task Analysis" className="p-4 rounded-xl backdrop-blur-md bg-white/10">
        <h2 className="text-xl font-semibold mb-4">Task Analysis</h2>
        <div className="space-y-3">
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg flex items-center justify-between"
              style={{ backgroundColor: `${priorityColors[task.priority]}20` }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className="mr-3 h-4 w-4"
                />
                <span className={task.completed ? 'line-through' : ''}>
                  {task.title}
                </span>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: priorityColors[task.priority] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeManagementPage;
