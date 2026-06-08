import { useMemo, useState } from "react";

export function useJobFilter(jobs) {
  const [filter, setFilter] = useState("all");

  const filteredJobs = useMemo(() => {
    switch (filter) {
      case "urgent":
        return jobs.filter(j => j.urgent);
      case "nursing":
        return jobs.filter(j => j.title.includes("Nurse"));
      case "care":
        return jobs.filter(
          j => j.title.includes("Care") || j.title.includes("Support")
        );
      default:
        return jobs;
    }
  }, [filter, jobs]);

  return { filter, setFilter, filteredJobs };
}