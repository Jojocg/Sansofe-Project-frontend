import { useState, useEffect, useContext } from "react";
/* import { useParams } from "react-router-dom"; */
import { Mail, Calendar } from "lucide-react";

import usersService from "../../services/users.service";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await usersService.getOneProfile(user._id);
        setProfile(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("No se pudo cargar la información del perfil");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [user._id]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="alert alert-error shadow-lg max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 my-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-200 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar/Profile Image */}
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src="https://picsum.photos/id/674/200/300"
                    alt={profile.name} 
                  />
                </div>
              </div>
              
              {/* User Information */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-base-content">{profile.name}</h1>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-center md:justify-start text-base-content/80 gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{profile.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start text-base-content/80 gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Miembro desde: {new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

