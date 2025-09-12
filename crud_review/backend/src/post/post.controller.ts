import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import express from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('search')
  async searchByTitle(@Query('target') title: string) {
    return {
      message: 'Posts retrieved successfully',
      data: await this.postService.searchByTitle(title),
    };
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postService.create(createPostDto);
    return { message: 'Post created successfully' };
  }

  @Get()
  async findAll() {
    return {
      message: 'Posts retrieved successfully',
      data: await this.postService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: express.Response) {
    const data = await this.postService.findOne(+id);
    if (!data) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post retrieved successfully',
      data: data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.update(+id, updatePostDto);
    return {
      message: 'Post updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(+id);
    return { message: 'Post deleted successfully' };
  }
}
