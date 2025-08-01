import { getRoutes } from '../getRoutes';
import { inMemoryContext } from '../testing-library/context-stubs';

describe('rewrites', () => {
  it('can handle rewrites', () => {
    expect(
      getRoutes(
        inMemoryContext({
          './(app)/index': () => null,
        }),
        {
          internal_stripLoadRoute: true,
          skipGenerated: true,
          rewrites: [{ source: '/old', destination: '/(app)/index' }],
          preserveRedirectAndRewrites: true,
        }
      )
    ).toEqual({
      children: [
        {
          children: [],
          contextKey: './old.js',
          destinationContextKey: './(app)/index.js',
          dynamic: null,
          generated: true,
          route: 'old',
          type: 'rewrite',
        },
        {
          children: [],
          contextKey: './(app)/index.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
          route: '(app)/index',
          type: 'route',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });

  it('handles multiple rewrites for different routes', () => {
    const routes = getRoutes(
      inMemoryContext({
        './index': () => null,
        './about': () => null,
        './contact': () => null,
      }),
      {
        internal_stripLoadRoute: true,
        skipGenerated: true,
        rewrites: [
          { source: '/info', destination: '/about' },
          { source: '/reach-us', destination: '/contact' },
        ],
        preserveRedirectAndRewrites: true,
      }
    );

    expect(routes).toEqual({
      children: [
        {
          children: [],
          contextKey: './index.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './index.js'],
          route: 'index',
          type: 'route',
        },
        {
          children: [],
          contextKey: './about.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './about.js'],
          route: 'about',
          type: 'route',
        },
        {
          children: [],
          contextKey: './contact.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './contact.js'],
          route: 'contact',
          type: 'route',
        },
        {
          children: [],
          contextKey: './info.js',
          destinationContextKey: './about.js',
          dynamic: null,
          generated: true,
          route: 'info',
          type: 'rewrite',
        },
        {
          children: [],
          contextKey: './reach-us.js',
          destinationContextKey: './contact.js',
          dynamic: null,
          generated: true,
          route: 'reach-us',
          type: 'rewrite',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });

  it('handles multiple rewrites for the same route', () => {
    const routes = getRoutes(
      inMemoryContext({
        './(app)/index': () => null,
      }),
      {
        internal_stripLoadRoute: true,
        skipGenerated: true,
        rewrites: [
          { source: '/info', destination: '/(app)/index' },
          { source: '/news', destination: '/(app)/index' },
        ],
        preserveRedirectAndRewrites: true,
      }
    );

    expect(routes).toEqual({
      children: [
        {
          children: [],
          contextKey: './info.js',
          destinationContextKey: './(app)/index.js',
          dynamic: null,
          generated: true,
          route: 'info',
          type: 'rewrite',
        },
        {
          children: [],
          contextKey: './news.js',
          destinationContextKey: './(app)/index.js',
          dynamic: null,
          generated: true,
          route: 'news',
          type: 'rewrite',
        },
        {
          children: [],
          contextKey: './(app)/index.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
          route: '(app)/index',
          type: 'route',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });

  it('handles dynamic rewrites', () => {
    expect(
      getRoutes(
        inMemoryContext({
          './(app)/index': () => null,
          './(app)/[slug]': () => null,
        }),
        {
          internal_stripLoadRoute: true,
          skipGenerated: true,
          rewrites: [{ source: '/old/[slug]', destination: '/(app)/[slug]' }],
          preserveRedirectAndRewrites: true,
        }
      )
    ).toEqual({
      children: [
        {
          children: [],
          contextKey: './(app)/index.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
          route: '(app)/index',
          type: 'route',
        },
        {
          children: [],
          contextKey: './(app)/[slug].js',
          dynamic: [
            {
              deep: false,
              name: 'slug',
            },
          ],
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/[slug].js'],
          route: '(app)/[slug]',
          type: 'route',
        },
        {
          children: [],
          contextKey: './old/[slug].js',
          destinationContextKey: './(app)/[slug].js',
          dynamic: [
            {
              deep: false,
              name: 'slug',
            },
          ],
          generated: true,
          route: 'old/[slug]',
          type: 'rewrite',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });

  it('will not duplicate routes for rewrites', () => {
    expect(
      getRoutes(
        inMemoryContext({
          './(app)/index': () => null,
          './(app)/[slug]': () => null,
          'old/[slug]': () => null,
        }),
        {
          internal_stripLoadRoute: true,
          skipGenerated: true,
          rewrites: [{ source: 'old/[slug]', destination: '/(app)/[slug]' }],
          preserveRedirectAndRewrites: true,
        }
      )
    ).toEqual({
      children: [
        {
          children: [],
          contextKey: './(app)/index.js',
          dynamic: null,
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/index.js'],
          route: '(app)/index',
          type: 'route',
        },
        {
          children: [],
          contextKey: './(app)/[slug].js',
          dynamic: [
            {
              deep: false,
              name: 'slug',
            },
          ],
          entryPoints: ['expo-router/build/views/Navigator.js', './(app)/[slug].js'],
          route: '(app)/[slug]',
          type: 'route',
        },
        {
          children: [],
          contextKey: './old/[slug].js',
          dynamic: [
            {
              deep: false,
              name: 'slug',
            },
          ],
          entryPoints: ['expo-router/build/views/Navigator.js', './old/[slug].js'],
          route: 'old/[slug]',
          type: 'route',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });

  it('handles rewrites for special route names', () => {
    expect(
      getRoutes(
        inMemoryContext({
          './+not-found': () => null,
          './404': () => null,
        }),
        {
          internal_stripLoadRoute: true,
          skipGenerated: true,
          rewrites: [{ source: '/404', destination: '/+not-found' }],
          preserveRedirectAndRewrites: true,
        }
      )
    ).toEqual({
      children: [
        {
          children: [],
          contextKey: './+not-found.js',
          dynamic: [
            {
              deep: true,
              name: '+not-found',
              notFound: true,
            },
          ],
          entryPoints: ['expo-router/build/views/Navigator.js', './+not-found.js'],
          route: '+not-found',
          type: 'route',
        },
        {
          children: [],
          contextKey: './404.js',
          destinationContextKey: './+not-found.js',
          dynamic: null,
          generated: true,
          route: '404',
          type: 'rewrite',
        },
      ],
      contextKey: 'expo-router/build/views/Navigator.js',
      dynamic: null,
      generated: true,
      route: '',
      type: 'layout',
    });
  });
});

describe('loaders', () => {
  it('should include routes with loaders', async () => {
    // TODO(@hassankhan): Investigate why inMemoryContext does not work with loaders
    const mockContext = Object.assign(
      function (id: string) {
        return {
          default: () => null,
          loader: () => Promise.resolve({ data: 'Loader for index' }),
        };
      },
      {
        keys: () => ['./(app)/index.js'],
        resolve: (key: string) => key,
        id: '0',
      }
    );
    const routes = getRoutes(mockContext, { skipGenerated: true });

    const indexRoute = routes.children.find((route) => route.route === '(app)/index');
    expect(indexRoute).toBeDefined();
    const loadedIndexRoute = indexRoute.loadRoute();
    expect(await loadedIndexRoute.loader({ params: {} })).toEqual({ data: 'Loader for index' });
  });

  it('should validate loader is a function in development mode', () => {
    process.env.NODE_ENV = 'development';

    // TODO(@hassankhan): Investigate why inMemoryContext does not work with loaders
    const mockContext = Object.assign(
      function (id: string) {
        // This is called by loadRoute()
        return {
          default: () => null,
          loader: 'not a function', // Invalid loader
        };
      },
      {
        keys: () => ['./(app)/index.js'],
        resolve: (key: string) => key,
        id: '0',
      }
    );

    expect(() => {
      getRoutes(mockContext, {
        skipGenerated: true,
        importMode: 'sync',
        ignoreRequireErrors: false,
      });
    }).toThrow('Route "./(app)/index.js" exports a loader that is not a function.');
  });
});
