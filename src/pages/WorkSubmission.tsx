import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, MapPin, DollarSign } from "lucide-react";

const WorkSubmission = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    location: "",
    coordinates: "",
    notes: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const project = {
    id: 1,
    name: "Community Center Construction",
    budget: 50000,
    spent: 22500,
    phase: "Structural framework installation"
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Work submission:", { formData, uploadedFiles });
    // Submission logic will be implemented later
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: `${latitude}, ${longitude}`
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Button>
        </div>

        {/* Project Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription>Current Phase: {project.phase}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Budget: ${project.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Spent: ${project.spent.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Submission Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Work Progress</CardTitle>
            <CardDescription>
              Upload photos and details of completed work for payment approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Work Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the work completed in this phase"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Request ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Work Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Specific location of work"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinates">GPS Coordinates</Label>
                <div className="flex space-x-2">
                  <Input
                    id="coordinates"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                    placeholder="Latitude, Longitude"
                    readOnly
                  />
                  <Button type="button" variant="outline" onClick={getCurrentLocation}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Location
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm font-medium text-primary hover:text-primary/80">
                          Click to upload photos
                        </span>
                        <span className="text-sm text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <Label>Uploaded Photos ({uploadedFiles.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-xs text-center p-2">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeFile(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any additional information or challenges encountered"
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="submit">Submit for Approval</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkSubmission;