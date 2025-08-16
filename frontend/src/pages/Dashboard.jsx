import React, { useState } from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleTeamAction = () => {
    setRefresh(!refresh);
  };

  const handleProjectSubmitted = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Hackathon Dashboard</h1>

      {}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Team Management</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {}
          <TeamForm onTeamCreated={handleTeamAction} />
          {}
          <TeamList teams={teams} setTeams={setTeams} refresh={refresh} />
        </div>
      </section>

      {}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Project Submissions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {}
          <ProjectForm teams={teams} onProjectSubmitted={handleProjectSubmitted} />
          {}
          <ProjectList projects={projects} setProjects={setProjects} refresh={refresh} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;