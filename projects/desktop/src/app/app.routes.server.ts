import { RenderMode, ServerRoute } from '@angular/ssr';

const userRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Prerender
  },
]

export const serverRoutes: ServerRoute[] = [
  ...userRoutes,
  {
    path: "**",
    renderMode: RenderMode.Prerender
  },
];
