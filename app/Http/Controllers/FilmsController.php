<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilmsController extends Controller
{
    public function index()
    {
        return view('homePage');
    }
}
