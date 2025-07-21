<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    @if (isset($page['props']['meta']))
    <title>{{ $page['props']['meta']['title'] }}</title>
    <meta name="description" content="{{ $page['props']['meta']['description'] }}">

    <meta property="og:title" content="{{ $page['props']['meta']['title'] }}">
    <meta property="og:description" content="{{ $page['props']['meta']['description'] }}">
    <meta property="og:image" content="{{ $page['props']['meta']['image'] }}">
    <meta property="og:url" content="{{ $page['props']['meta']['url'] }}">
    <meta property="og:type" content="website">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $page['props']['meta']['title'] }}">
    <meta name="twitter:description" content="{{ $page['props']['meta']['description'] }}">
    <meta name="twitter:image" content="{{ $page['props']['meta']['image'] }}">
    @endif
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>