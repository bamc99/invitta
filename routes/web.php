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

Route::get('invites', function () {
    return Inertia::render('invites/single');
})->name('invites');

// /events/invitation/guests/
Route::get('invitation/guests/{guest}', [GuestController::class, 'invitation'])->name('invites.guests');
Route::get('after-invitation', [GuestController::class, 'afterInvitation'])->name('after-invitation');
Route::post('guests/confirmations', [GuestController::class, 'confirmations'])->name('guests.confirmations');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
