import { Application, getApplications } from "@raycast/api";

export interface ExtendedApplication extends Application {
  type: string;
}

async function getAllApplications() {
  const appsList = await getApplications();
  const self: Application = {
    name: "Raycast",
    bundleId: "com.raycast.macos",
    path: "/Applications/Raycast.app",
  };
  appsList.push(self);

  const apps: ExtendedApplication[] = [];
  (appsList as ExtendedApplication[]).forEach((app) => {
    if (app.path.match(/^\/Users\/.*\/\..*\//)) return;
    if (app.path.startsWith("/Applications/") || app.path.startsWith("/Users/")) app.type = "user";
    else app.type = "system";
    apps.push(app);
  });

  return apps;
}

export default getAllApplications;
