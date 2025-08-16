import React, { useState } from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  // This 'refresh' state is a simple way to trigger updates in child components
  const [refresh, setRefresh] = useState(false);

  const handleTeamAction = () => {
    // When a team is created, updated, or deleted, toggle 'refresh' to force TeamList to refetch
    setRefresh(!refresh);
  };

  const handleProjectSubmitted = () => {
    // When a project is submitted, toggle 'refresh' to force ProjectList to refetch
    setRefresh(!refresh);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Hackathon Dashboard</h1>

      {/* Section for Teams */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Team Management</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pass the handler to TeamForm so it can trigger a refresh */}
          <TeamForm onTeamCreated={handleTeamAction} />
          {/* Pass the 'refresh' state to TeamList so it knows when to refetch */}
          <TeamList teams={teams} setTeams={setTeams} refresh={refresh} />
        </div>
      </section>

      {/* Section for Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Project Submissions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pass teams to the form so users can select a team */}
          <ProjectForm teams={teams} onProjectSubmitted={handleProjectSubmitted} />
          {/* Pass the 'refresh' state to ProjectList */}
          <ProjectList projects={projects} setProjects={setProjects} refresh={refresh} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;