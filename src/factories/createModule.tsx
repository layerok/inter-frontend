import { RouteObject } from "react-router-dom";

export const createModule = ({
  id,
  path,
  listView,
  showView,
  createView,
  layoutView,
}: {
  id: string;
  path: string;
  listView: {
    route: RouteObject;
  };
  showView: {
    route: RouteObject;
  };
  createView: {
    route: RouteObject;
  };
  layoutView: {
    route: RouteObject;
  };
}) => {
  const routes = {
    layout: {
      id: `${id}-layout`,
      path: `${path}`,
    },
    list: {
      id: `${id}-list`,
    },
    create: {
      id: `${id}-create`,
      path: `${path}/create`,
    },
    show: {
      id: `${id}-show`,
      path: `${path}/:id`,
    },
  };

  const routeObjects: RouteObject[] = [
    {
      ...routes.layout,
      ...layoutView.route,
      children: [
        // @ts-ignore
        {
          id: routes.list.id,
          ...listView.route,
          index: true,
        },
        {
          ...routes.create,
          ...createView.route,
        },
        {
          ...routes.show,
          ...showView.route,
        },
      ],
    },
  ];

  return {
    routes,
    routeObjects,
  };
};
