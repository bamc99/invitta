<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GuestController;
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

Route::middleware('auth')->group(function () {
    Route::redirect('event', '/event/all');

    Route::get('event/all', [EventController::class, 'index'])->name('event.index');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
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

// /events/invitation/guests/
Route::get('invitation/guests/{guest}', [GuestController::class, 'invitation'])->name('invites.guests');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
