<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'parent_guest_id',
        'first_name',
        'last_name',
        'phone',
    ];

    // event relation
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function guests() // hijos
    {
        return $this->hasMany(Guest::class, 'parent_guest_id');
    }

    public function parentGuest() // padre
    {
        return $this->belongsTo(Guest::class, 'parent_guest_id');
    }
}
