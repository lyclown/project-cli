#!/usr/bin/env node
import { program } from 'commander';
import initAction from '../src/commands/init.js';

program
  .version('0.0.1') // 定义版本号
  .description('My Frontend Scaffold'); // 定义描述信息

program
  .command('init [template] [project]') // 定义 init 命令，<template> 和 <project> 是参数
  .description('Initialize project template') // 定义命令的描述信息
  .option('-i, --install', 'Install dependencies after initializing project')
  .option('-m, --manager <manager>', 'Specify package manager to use', 'npm')
  .action((template, project, options) => {
    // 调用init命令的处理逻辑
    initAction(template, project, options);
  });

// 解析命令行参数
program.parse(process.argv);
