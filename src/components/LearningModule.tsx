
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Play, CheckCircle, BookOpen, Code, Database, Brain } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  completed: boolean;
}

interface LearningModuleProps {
  module: {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    icon: React.ReactNode;
  };
  onLessonComplete: (moduleId: string, lessonId: string) => void;
  onCodeExample: (code: string) => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({
  module,
  onLessonComplete,
  onCodeExample
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const completedLessons = module.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / module.lessons.length) * 100;

  return (
    <div className="bg-slate-700/50 rounded-xl border border-slate-600">
      <div 
        className="p-6 cursor-pointer hover:bg-slate-700/70 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{module.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="text-sm text-slate-300">{module.description}</p>
              <div className="mt-2">
                <div className="w-48 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{completedLessons}/{module.lessons.length} lessons completed</p>
              </div>
            </div>
          </div>
          {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-600">
          <div className="p-6 space-y-4">
            {module.lessons.map((lesson) => (
              <div key={lesson.id} className="border border-slate-600 rounded-lg">
                <div 
                  className="p-4 cursor-pointer hover:bg-slate-600/50 transition-colors"
                  onClick={() => setSelectedLesson(selectedLesson === lesson.id ? null : lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        lesson.completed ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300'
                      }`}>
                        {lesson.completed ? '✓' : '○'}
                      </div>
                      <span className={`${lesson.completed ? 'text-green-400' : 'text-white'}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {lesson.codeExample && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCodeExample(lesson.codeExample!);
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
                        >
                          <Code className="w-3 h-3 inline mr-1" />
                          Try Code
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLessonComplete(module.id, lesson.id);
                        }}
                        className={`px-3 py-1 text-xs rounded transition-colors ${
                          lesson.completed 
                            ? 'bg-green-600/20 text-green-400 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={lesson.completed}
                      >
                        {lesson.completed ? 'Complete' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedLesson === lesson.id && (
                  <div className="border-t border-slate-600 p-4 bg-slate-800/50">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-slate-200 whitespace-pre-line">
                        {lesson.content}
                      </div>
                      {lesson.codeExample && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Code Example:</h4>
                          <pre className="bg-black/50 rounded-lg p-4 text-green-400 text-sm font-mono overflow-x-auto">
                            {lesson.codeExample}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
