import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogPost } from '../BlogPost';


@Component({
  selector: 'app-blog-list',
  imports: [RouterOutlet,RouterLink,CommonModule],
  standalone:true,
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogPosts = data;
    });
  }
}
