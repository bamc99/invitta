<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Invites routes
// Route::get('invite/{token}', function (string $token) {
//     $invite = \App\Models\Invite::where('token', $token)->first();
//     if (! $invite) {
//         abort(404);
//     }
//     if ($invite->used) {
//         abort(403);
//     }
//     $invite->used = true;
//     $invite->save();
//     return Inertia::render('invite', [
//         'invite' => $invite,
//     ]);
// })->name('invite');

Route::get('invites', function () {
    return Inertia::render('invites/single');
})->name('invites');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
