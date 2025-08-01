import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Eye, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Active Projects", value: "24", icon: TrendingUp },
    { label: "Total Investment", value: "$2.4M", icon: TrendingUp },
    { label: "Completed Projects", value: "156", icon: Shield },
    { label: "Communities Served", value: "89", icon: Users },
  ];

  const recentProjects = [
    {
      name: "Community Center Construction",
      location: "Rural District A",
      status: "In Progress",
      completion: 45
    },
    {
      name: "School Playground Development", 
      location: "Rural District B",
      status: "Planning",
      completion: 10
    },
    {
      name: "Water Filtration System",
      location: "Rural District C",
      status: "Completed",
      completion: 100
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Track<span className="text-primary">It</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transparent tracking of rural recreation funds using blockchain technology
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor project progress, verify fund allocation, and ensure accountability in rural development initiatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="text-lg">
                Browse Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Login / Register
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Recent Projects</CardTitle>
                <CardDescription>Latest rural development initiatives</CardDescription>
              </div>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant={
                        project.status === "Completed" ? "default" :
                        project.status === "In Progress" ? "secondary" : "outline"
                      }>
                        {project.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{project.completion}% complete</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Blockchain Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Immutable transaction records ensure fund transparency and prevent fraud
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Eye className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor project progress with live updates, photos, and milestone verification
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Community Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Public access to project information promotes community involvement and accountability
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
