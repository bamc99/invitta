<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    // event relation
    public function event()
    {
        return $this->belongsTo('App\Models\Event');
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
