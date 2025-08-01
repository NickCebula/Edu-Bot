import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageLayout from "../components/ui/PageLayout";

// Example navigation links
const navLinks = [
  { to: "/subjects", label: "SUBJECTS" },
  { to: "/evaluations", label: "EVALUATIONS" },
  { to: "/profile", label: "PROFILE" },
];

export default function Evaluations() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await authFetch("/api/evaluation/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLogs([
          ...logs,
          { 
            type: 'success', 
            timestamp: new Date().toLocaleString(), 
            message: data.evaluation || "Generated evaluation successfully." 
          }
        ]);
      } else {
        setLogs([
          ...logs,
          { 
            type: 'error', 
            timestamp: new Date().toLocaleString(), 
            message: "Failed to generate evaluation." 
          }
        ]);
      }
    } catch (error) {
      setLogs([
        ...logs,
        { 
          type: 'error', 
          timestamp: new Date().toLocaleString(), 
          message: "Error generating evaluation." 
        }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar title="Edu-Bot" links={navLinks} username="Guest" />
      
      <PageLayout>
        <PageLayout.Header
          title="Evaluations"
          subtitle="Generate and view your learning assessments to track your progress"
          icon="📊"
        />

        <PageLayout.Content>
          {/* Action Card */}
          <Card className="mb-8" padding="lg">
            <Card.Header>
              <Card.Title icon="⚡">
                Generate New Evaluation
              </Card.Title>
              <p className="text-gray-600 mt-2">
                Create a comprehensive assessment of your learning progress across all subjects.
              </p>
            </Card.Header>
            
            <Card.Content>
              <Button
                variant="success"
                size="lg"
                onClick={handleGenerate}
                loading={loading}
                disabled={loading}
                icon="📈"
                className="w-full sm:w-auto"
              >
                {loading ? "Generating..." : "Generate New Evaluation"}
              </Button>
            </Card.Content>
          </Card>

          {/* Evaluation Logs */}
          <Card padding="lg">
            <Card.Header>
              <Card.Title icon="📋">
                Evaluation History
              </Card.Title>
              {logs.length === 0 && (
                <p className="text-gray-600 mt-2">
                  No evaluations generated yet. Click the button above to generate your first evaluation.
                </p>
              )}
            </Card.Header>

            {logs.length > 0 && (
              <Card.Content>
                <div className="space-y-4">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-l-4 ${
                        log.type === 'success'
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                          log.type === 'success'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {log.type === 'success' ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{log.message}</p>
                          <p className="text-sm opacity-75 mt-1">{log.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            )}
          </Card>

          {/* Info Section */}
          <Card className="mt-8" variant="subtle" padding="lg">
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                About Evaluations
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Evaluations help track your learning progress and identify areas for improvement. 
                They analyze your performance across all subjects and provide personalized feedback 
                to help you succeed in your educational journey.
              </p>
              <div className="mt-6">
                <Button
                  to="/subjects"
                  variant="outline"
                  icon="📚"
                >
                  Back to Subjects
                </Button>
              </div>
            </div>
          </Card>
        </PageLayout.Content>
      </PageLayout>
    </div>
  );
}