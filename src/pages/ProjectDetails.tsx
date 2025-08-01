import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, DollarSign, Calendar, User, Camera, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const ProjectDetails = () => {
  const [project] = useState({
    id: 1,
    name: "Community Center Construction",
    description: "Building a multi-purpose community center to serve rural residents with meeting spaces, recreational facilities, and educational programs.",
    location: "Rural District A",
    budget: 50000,
    spent: 22500,
    status: "In Progress",
    completion: 45,
    startDate: "2024-01-15",
    expectedCompletion: "2024-07-15",
    ngo: "Rural Development Foundation",
    president: "John Doe",
    contractor: "BuildRight Construction",
    category: "Community Development"
  });

  const updates = [
    {
      id: 1,
      date: "2024-03-01",
      description: "Foundation work completed",
      amount: 15000,
      photos: 3,
      status: "approved",
      contractor: "BuildRight Construction"
    },
    {
      id: 2,
      date: "2024-03-15",
      description: "Structural framework installation",
      amount: 7500,
      photos: 5,
      status: "pending",
      contractor: "BuildRight Construction"
    }
  ];

  const timeline = [
    { phase: "Planning & Approval", status: "completed", date: "Jan 2024" },
    { phase: "Foundation", status: "completed", date: "Feb 2024" },
    { phase: "Structure", status: "in-progress", date: "Mar 2024" },
    { phase: "Interior Work", status: "pending", date: "Apr 2024" },
    { phase: "Final Inspection", status: "pending", date: "Jun 2024" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                  </div>
                  <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.contractor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Budget</span>
                    <span className="font-semibold">${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount Spent</span>
                    <span className="font-semibold">${project.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="font-semibold">${(project.budget - project.spent).toLocaleString()}</span>
                  </div>
                  <Progress value={(project.spent / project.budget) * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">NGO</p>
                  <p className="font-medium">{project.ngo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">President</p>
                  <p className="font-medium">{project.president}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contractor</p>
                  <p className="font-medium">{project.contractor}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="updates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>Latest progress reports and payment requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div key={update.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{update.description}</h4>
                          <p className="text-sm text-muted-foreground">by {update.contractor}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={update.status === "approved" ? "default" : "secondary"}>
                            {update.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{update.date}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">Amount: ${update.amount.toLocaleString()}</span>
                          <div className="flex items-center space-x-1">
                            <Camera className="h-4 w-4" />
                            <span className="text-sm">{update.photos} photos</span>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">View Photos</Button>
                           {update.status === "pending" && (
                             <>
                               <Button variant="outline" size="sm">Reject</Button>
                               <Button size="sm">Approve</Button>
                             </>
                           )}
                         </div>
                       </div>
                     </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Project phases and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        phase.status === "completed" ? "bg-green-500 text-white" :
                        phase.status === "in-progress" ? "bg-blue-500 text-white" :
                        "bg-gray-200 text-gray-500"
                      }`}>
                        {phase.status === "completed" && <CheckCircle className="h-4 w-4" />}
                        {phase.status === "in-progress" && <div className="w-2 h-2 bg-white rounded-full" />}
                        {phase.status === "pending" && <div className="w-2 h-2 bg-gray-400 rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground">{phase.date}</p>
                      </div>
                      <Badge variant={
                        phase.status === "completed" ? "default" :
                        phase.status === "in-progress" ? "secondary" : "outline"
                      }>
                        {phase.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Project Photos</CardTitle>
                <CardDescription>Visual progress documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>Contracts, permits, and other documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Project Proposal.pdf", "Construction Permit.pdf", "Budget Breakdown.xlsx", "Environmental Assessment.pdf"].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{doc}</span>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;