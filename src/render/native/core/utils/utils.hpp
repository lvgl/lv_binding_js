#pragma once

#include <stdint.h>
#include <stdlib.h>
#include <mutex>

template<size_t BlockSize, size_t BlockNum = 10>
class MemoryPool {
  public:
	MemoryPool()
	{
		std::lock_guard<std::mutex> lk(mtx); // avoid race condition

		// init empty memory pointer
		free_block_head = NULL;
		mem_chunk_head = NULL;
	}

	~MemoryPool()
	{
		std::lock_guard<std::mutex> lk(mtx); // avoid race condition
		printf("MemoryPool destructor \n");
		// destruct automatically
		MemChunk* p;
		while (mem_chunk_head)
		{
			p = mem_chunk_head->next;
			delete mem_chunk_head;
			mem_chunk_head = p;
		}
	}

	void* allocate()
	{
		std::lock_guard<std::mutex> lk(mtx); // avoid race condition

		// allocate one object memory

		// if no free block in current chunk, should create new chunk
		if (!free_block_head)
		{
			// malloc mem chunk
			MemChunk* new_chunk = new MemChunk;
			new_chunk->next = NULL;

			// set this chunk's first block as free block head
			free_block_head = &(new_chunk->blocks[0]);

			// link the new chunk's all blocks
			for (int i = 1; i < BlockNum; i++)
				new_chunk->blocks[i - 1].next = &(new_chunk->blocks[i]);
			new_chunk->blocks[BlockNum - 1].next = NULL; // final block next is NULL
			
			if (!mem_chunk_head)
				mem_chunk_head = new_chunk;
			else
			{
				// add new chunk to chunk list
				mem_chunk_head->next = new_chunk;
				mem_chunk_head = new_chunk;
			}
		}

		// allocate the current free block to the object
		void* object_block = free_block_head;
		free_block_head = free_block_head->next; 

		return object_block;
	}

	void* allocate(size_t size)
	{
		std::lock_guard<std::mutex> lk(array_mtx); // avoid race condition for continuous memory

		// calculate objects num
		int n = size / BlockSize;

		// allocate n objects in continuous memory
		
		// FIXME: make sure n > 0
		void* p = allocate();

		for (int i = 1; i < n; i++)
			allocate();

		return p;
	}

	void deallocate(void* p)
	{
		std::lock_guard<std::mutex> lk(mtx); // avoid race condition

		// free object memory
		FreeBlock* block = static_cast<FreeBlock*>(p);
		block->next = free_block_head; // insert the free block to head
		free_block_head = block;
	}

  private:
	// free node block, every block size exactly can contain one object
	struct FreeBlock
	{
		unsigned char data[BlockSize];
		FreeBlock* next;
	};

	FreeBlock* free_block_head;

	// memory chunk, every chunk contains blocks number with fixed BlockNum
	struct MemChunk
	{
		FreeBlock blocks[BlockNum];
		MemChunk* next;
	};

	MemChunk* mem_chunk_head;

	// thread safe related
	std::mutex mtx;
	std::mutex array_mtx;
};