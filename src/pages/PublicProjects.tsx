import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, DollarSign, Calendar, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";

const PublicProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const projects = [
    {
      id: 1,
      name: "Community Center Construction",
      description: "Building a multi-purpose community center with meeting spaces and recreational facilities.",
      location: "Rural District A",
      budget: 50000,
      spent: 22500,
      status: "In Progress",
      completion: 45,
      startDate: "2024-01-15",
      ngo: "Rural Development Foundation",
      category: "Community Development"
    },
    {
      id: 2,
      name: "School Playground Development",
      description: "Creating a safe and modern playground for the local elementary school.",
      location: "Rural District B",
      budget: 25000,
      spent: 0,
      status: "Pending Approval",
      completion: 0,
      startDate: "2024-04-01",
      ngo: "Education First NGO",
      category: "Education"
    },
    {
      id: 3,
      name: "Water Filtration System",
      description: "Installing clean water filtration systems for 5 rural villages.",
      location: "Rural District C",
      budget: 75000,
      spent: 75000,
      status: "Completed",
      completion: 100,
      startDate: "2023-08-01",
      ngo: "Clean Water Initiative",
      category: "Infrastructure"
    },
    {
      id: 4,
      name: "Solar Power Installation",
      description: "Installing solar panels for renewable energy in community buildings.",
      location: "Rural District A",
      budget: 40000,
      spent: 28000,
      status: "In Progress",
      completion: 70,
      startDate: "2024-02-01",
      ngo: "Green Energy Foundation",
      category: "Environment"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || project.location === locationFilter;
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const locations = [...new Set(projects.map(p => p.location))];
  const statuses = [...new Set(projects.map(p => p.status))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rural Development Projects</h1>
          <p className="text-muted-foreground">
            Track the progress of rural recreation and development projects in your area
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search & Filter Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setStatusFilter("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === "In Progress").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === "Completed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge variant={
                    project.status === "Completed" ? "default" :
                    project.status === "In Progress" ? "secondary" : "outline"
                  }>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${project.budget.toLocaleString()} budget
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Started {project.startDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.completion}%</span>
                    </div>
                    <Progress value={project.completion} />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground">
                      by {project.ngo}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/project/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setStatusFilter("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
};

export default PublicProjects;